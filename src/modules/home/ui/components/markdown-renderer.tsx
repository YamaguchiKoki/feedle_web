"use client";

import Image from "next/image";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface MarkdownRendererProps {
	content: string;
	appName: string;
	topicIndex: number;
}

export function MarkdownRenderer({ content, appName }: MarkdownRendererProps) {
	// Custom components for react-markdown
	const components: Components = {
		// Custom heading renderer with proper IDs
		h1: ({ children, ...props }) => {
			const headingText =
				typeof children === "string" ? children : String(children);
			const id = `heading-${appName}-${headingText.toLowerCase().replace(/[^\w]+/g, "-")}`;
			return (
				<h1 id={id} className="md-heading md-h1" {...props}>
					{children}
				</h1>
			);
		},
		h2: ({ children, ...props }) => {
			const headingText =
				typeof children === "string" ? children : String(children);
			const id = `heading-${appName}-${headingText.toLowerCase().replace(/[^\w]+/g, "-")}`;
			return (
				<h2 id={id} className="md-heading md-h2" {...props}>
					{children}
				</h2>
			);
		},
		h3: ({ children, ...props }) => {
			const headingText =
				typeof children === "string" ? children : String(children);
			const id = `heading-${appName}-${headingText.toLowerCase().replace(/[^\w]+/g, "-")}`;
			return (
				<h3 id={id} className="md-heading md-h3" {...props}>
					{children}
				</h3>
			);
		},
		h4: ({ children, ...props }) => {
			const headingText =
				typeof children === "string" ? children : String(children);
			const id = `heading-${appName}-${headingText.toLowerCase().replace(/[^\w]+/g, "-")}`;
			return (
				<h4 id={id} className="md-heading md-h4" {...props}>
					{children}
				</h4>
			);
		},
		h5: ({ children, ...props }) => {
			const headingText =
				typeof children === "string" ? children : String(children);
			const id = `heading-${appName}-${headingText.toLowerCase().replace(/[^\w]+/g, "-")}`;
			return (
				<h5 id={id} className="md-heading md-h5" {...props}>
					{children}
				</h5>
			);
		},
		h6: ({ children, ...props }) => {
			const headingText =
				typeof children === "string" ? children : String(children);
			const id = `heading-${appName}-${headingText.toLowerCase().replace(/[^\w]+/g, "-")}`;
			return (
				<h6 id={id} className="md-heading md-h6" {...props}>
					{children}
				</h6>
			);
		},

		// Custom image renderer with video support
		img: ({ src, alt, title }) => {
			const cleanAlt = alt ? alt.trim() : "";
			if (cleanAlt === "Video" && src) {
				const videoSrc = typeof src === "string" ? src : "";
				// Generate caption track URL by replacing video extension with .vtt
				const captionSrc = videoSrc.replace(/\.(mp4|mov|avi|webm)$/i, ".vtt");

				return (
					<video
						controls
						style={{ maxWidth: "100%", borderRadius: "8px", margin: "1rem 0" }}
					>
						<source src={videoSrc} type="video/mp4" />
						<track
							kind="captions"
							src={captionSrc}
							srcLang="en"
							label="English"
							default
						/>
						Your browser does not support the video tag.
					</video>
				);
			}
			return (
				<Image
					src={typeof src === "string" ? src : ""}
					alt={alt || ""}
					title={title}
					width={800}
					height={600}
					style={{ maxWidth: "100%", borderRadius: "8px", margin: "1rem 0" }}
				/>
			);
		},

		// Custom link renderer with external link handling
		a: ({ href, title, children, ...props }) => {
			if (!href) return <a {...props}>{children}</a>;
			// Skip javascript: links for security
			if (href.startsWith("javascript:")) {
				return <span>{children}</span>;
			}

			const finalUrl =
				!href.startsWith("http") && !href.startsWith("https")
					? `${window.location.origin}${href}`
					: href;

			return (
				<a
					href={finalUrl}
					title={title}
					target="_blank"
					rel="noopener noreferrer"
					{...props}
				>
					{children}
				</a>
			);
		},
	};

	return (
		<div className="markdown-content">
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkMath]}
				rehypePlugins={[rehypeKatex, rehypeRaw]}
				components={components}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
