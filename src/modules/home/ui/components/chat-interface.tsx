"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownRenderer } from "@/modules/home/ui/components/markdown-renderer";

interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
}

interface ChatInterfaceProps {
	topicId: string;
	topicContent: string;
}

export function ChatInterface({ topicId, topicContent }: ChatInterfaceProps) {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
			e.preventDefault();
			handleSend();
		}
	};

	const handleSend = async () => {
		if (!input.trim() || isLoading) return;

		const userMessage = input.trim();
		setInput("");
		setIsLoading(true);

		// Add user message
		const newMessages = [
			...messages,
			{ id: `${Date.now()}-user`, role: "user" as const, content: userMessage },
		];
		setMessages(newMessages);

		try {
			const chatHistory = newMessages
				.map(
					(msg) =>
						`${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`,
				)
				.join("\n\n");

			const response = await fetch(`/api/chat/${topicId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: userMessage,
					markdown: topicContent,
					chat_history: chatHistory,
				}),
			});

			const data = (await response.json()) as { response: string };

			// Add assistant response
			setMessages((prev) => [
				...prev,
				{
					id: `${Date.now()}-assistant`,
					role: "assistant",
					content: data.response,
				},
			]);
		} catch (error) {
			console.error("Error:", error);
			setMessages((prev) => [
				...prev,
				{
					id: `${Date.now()}-error`,
					role: "assistant",
					content: "Error: Failed to get response",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="border-t border-border pt-4 mt-4">
			{messages.length > 0 && (
				<div className="space-y-4 mb-4 max-h-96 overflow-y-auto custom-scrollbar">
					{messages.map((message) => (
						<Card
							key={message.id}
							className={message.role === "user" ? "ml-8" : "mr-8"}
						>
							<CardContent className="p-4">
								<div className="font-semibold text-sm mb-2">
									{message.role === "user" ? "You:" : "Assistant:"}
								</div>
								{message.role === "assistant" ? (
									<MarkdownRenderer
										content={message.content}
										appName={topicId.split("-")[0]}
										topicIndex={Number.parseInt(topicId.split("-")[1])}
									/>
								) : (
									<div className="text-sm">{message.content}</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>
			)}

			<div className="flex gap-2">
				<Textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyPress}
					placeholder="Ask a question about this topic..."
					className="min-h-[38px] resize-none"
					disabled={isLoading}
				/>
				<Button onClick={handleSend} disabled={isLoading || !input.trim()}>
					{isLoading ? "Sending..." : "Ask"}
				</Button>
			</div>
		</div>
	);
}
