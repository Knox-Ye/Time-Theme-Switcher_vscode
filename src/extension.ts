import * as vscode from "vscode";

type RawTimeSlot = {
	start?: unknown;
	end?: unknown;
	theme?: unknown;
	label?: unknown;
};

type TimeSlot = {
	start: string;
	end: string;
	theme: string;
	label?: string;
	startMinutes: number;
	endMinutes: number;
};

const CONFIG_SECTION = "timeThemeSwitcher";
const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

class ThemeScheduler implements vscode.Disposable {
	private intervalHandle: NodeJS.Timeout | undefined;

	public start(): void {
		this.resetInterval();
		void this.refreshTheme();
	}

	public async refreshTheme(manual = false): Promise<void> {
		const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
		const enabled = config.get<boolean>("enabled", true);

		if (!enabled) {
			if (manual) {
				void vscode.window.showInformationMessage("Time Theme Switcher is disabled.");
			}
			return;
		}

		const slots = this.getValidSlots(config.get<RawTimeSlot[]>("timeSlots", []));
		if (slots.length === 0) {
			if (manual) {
				void vscode.window.showWarningMessage("Time Theme Switcher has no valid time slots configured.");
			}
			return;
		}

		const now = new Date();
		const currentMinutes = now.getHours() * 60 + now.getMinutes();
		const matchingSlot = slots.find((slot) => this.matchesSlot(slot, currentMinutes));

		if (!matchingSlot) {
			if (manual) {
				void vscode.window.showWarningMessage("No configured theme slot matches the current time.");
			}
			return;
		}

		const workbenchConfig = vscode.workspace.getConfiguration("workbench");
		const currentTheme = workbenchConfig.get<string>("colorTheme");
		if (currentTheme === matchingSlot.theme) {
			if (manual) {
				void vscode.window.showInformationMessage(`Theme is already "${matchingSlot.theme}".`);
			}
			return;
		}

		try {
			await workbenchConfig.update("colorTheme", matchingSlot.theme, vscode.ConfigurationTarget.Global);

			const showNotifications = config.get<boolean>("showNotifications", false);
			if (manual || showNotifications) {
				const slotLabel = matchingSlot.label ? ` (${matchingSlot.label})` : "";
				void vscode.window.showInformationMessage(
					`Switched theme to "${matchingSlot.theme}"${slotLabel}.`
				);
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			void vscode.window.showErrorMessage(`Failed to switch theme: ${message}`);
		}
	}

	public reload(): void {
		this.resetInterval();
		void this.refreshTheme();
	}

	public dispose(): void {
		if (this.intervalHandle) {
			clearInterval(this.intervalHandle);
			this.intervalHandle = undefined;
		}
	}

	private resetInterval(): void {
		if (this.intervalHandle) {
			clearInterval(this.intervalHandle);
		}

		const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
		const intervalMinutes = Math.max(1, config.get<number>("checkIntervalMinutes", 1));
		this.intervalHandle = setInterval(() => {
			void this.refreshTheme();
		}, intervalMinutes * 60 * 1000);
	}

	private getValidSlots(rawSlots: RawTimeSlot[]): TimeSlot[] {
		return rawSlots.flatMap((rawSlot, index) => {
			const start = this.asString(rawSlot.start);
			const end = this.asString(rawSlot.end);
			const theme = this.asString(rawSlot.theme);
			const label = this.asOptionalString(rawSlot.label);

			if (!start || !end || !theme) {
				console.warn(`[Time Theme Switcher] Ignoring slot #${index + 1}: missing start, end, or theme.`);
				return [];
			}

			if (!TIME_PATTERN.test(start) || !TIME_PATTERN.test(end)) {
				console.warn(
					`[Time Theme Switcher] Ignoring slot #${index + 1}: start and end must use HH:mm format.`
				);
				return [];
			}

			return [
				{
					start,
					end,
					theme,
					label,
					startMinutes: this.toMinutes(start),
					endMinutes: this.toMinutes(end)
				}
			];
		});
	}

	private matchesSlot(slot: TimeSlot, currentMinutes: number): boolean {
		if (slot.startMinutes <= slot.endMinutes) {
			return currentMinutes >= slot.startMinutes && currentMinutes <= slot.endMinutes;
		}

		return currentMinutes >= slot.startMinutes || currentMinutes <= slot.endMinutes;
	}

	private toMinutes(value: string): number {
		const [hours, minutes] = value.split(":").map(Number);
		return hours * 60 + minutes;
	}

	private asString(value: unknown): string | undefined {
		return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
	}

	private asOptionalString(value: unknown): string | undefined {
		return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
	}
}

export function activate(context: vscode.ExtensionContext): void {
	const scheduler = new ThemeScheduler();
	scheduler.start();

	context.subscriptions.push(
		scheduler,
		vscode.commands.registerCommand("timeThemeSwitcher.refreshTheme", async () => {
			await scheduler.refreshTheme(true);
		}),
		vscode.workspace.onDidChangeConfiguration((event) => {
			if (
				event.affectsConfiguration(CONFIG_SECTION) ||
				event.affectsConfiguration("workbench.colorTheme")
			) {
				scheduler.reload();
			}
		})
	);
}

export function deactivate(): void {
	// Nothing to clean up here because subscriptions are disposed by VS Code.
}