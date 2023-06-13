import { Editor, MarkdownView, Plugin } from "obsidian";
import { markdownToBlocks } from "@tryfabric/mack";

// Remember to rename these classes and interfaces!

interface MarkdownToSlackMsgSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MarkdownToSlackMsgSettings = {
	mySetting: "default",
};

const SLACK_BLOCK_KIT_URI = "https://api.slack.com/tools/block-kit-builder";

export default class MarkdownToSlackMsg extends Plugin {
	settings: MarkdownToSlackMsgSettings;

	async onload() {
		await this.loadSettings();

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "markdown-to-slack-message",
			name: "Convert markdown to slack message",
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				const textContent = editor.getValue();
				const blocks = await markdownToBlocks(textContent);

				const q = new URLSearchParams();
				q.append("blocks", JSON.stringify(blocks));
				q.append("mode", "message");
				open(`${SLACK_BLOCK_KIT_URI}?${q}`);
			},
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
