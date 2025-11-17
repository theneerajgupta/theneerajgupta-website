import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_LOCATION = path.join(process.cwd(), 'content', 'blog');

const getBlogPost = () => {
  const file = 'first-blog.md';
  const filePath = path.join(BLOG_LOCATION, file);

  // Read file content
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Parse frontmatter and content
  const { data, content } = matter(fileContent);

  // Convert Markdown to HTML
  const htmlContent = marked(content);

  console.log('Frontmatter:', data);
  console.log('HTML Content:', htmlContent);

  return { data, htmlContent };
};

export default getBlogPost;
