import { Editor, MarkdownView, Plugin } from "obsidian";
import { markdownToBlocks } from "@tryfabric/mack";

const SLACK_BLOCK_KIT_URI = "https://api.slack.com/tools/block-kit-builder";

export default class MarkdownToSlackMsg extends Plugin {
	async onload() {
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
}
