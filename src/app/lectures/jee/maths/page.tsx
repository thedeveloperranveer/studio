
import Header from '@/components/layout/Header';

export default function JeeMathsPage() {
  const lectureCardsHTML = `
    <div class="lecture-card">
      <img src="https://img.youtube.com/vi/cS64-wAFDuI/0.jpg" alt="VECTORS MATHS BEST ONESHOT " class="thumbnail">
      <div class="card-content">
        <h3 class="title">VECTORS MATHS BEST ONESHOT </h3>
        <div class="tags">
              <span class="tag">THEORY</span>
              <span class="tag">ONESHOT</span>
              <span class="tag">JEE</span>
              <span class="tag">PYQs</span>
        </div>
        <a href="#" target="_blank" class="notes-button">View Notes</a>
        <a href="https://www.youtube.com/watch?v=cS64-wAFDuI" target="_blank" class="button">Watch on YouTube</a>
      </div>
    </div>
    <style>
      .lecture-card {
        background-color: #1e1e1e;
        color: white;
        font-family: sans-serif;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        width: 320px;
        transition: transform 0.2s;
        margin: 0.5rem;
      }
      .lecture-card:hover {
        transform: translateY(-5px);
      }
      .thumbnail {
        width: 100%;
        height: 180px;
        object-fit: cover;
      }
      .card-content {
        padding: 16px;
      }
      .title {
        font-size: 1.25rem;
        font-weight: bold;
        margin: 0 0 8px 0;
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 12px;
      }
      .tag {
        background-color: #333;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 0.8rem;
      }
      .notes {
        font-size: 0.9rem;
        color: #ccc;
        margin-bottom: 16px;
      }
      .notes-button {
        display: block;
        width: 100%;
        text-align: center;
        background-color: #333;
        color: white;
        padding: 10px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        margin-bottom: 10px;
        transition: background-color 0.2s;
      }
      .notes-button:hover {
        background-color: #444;
      }
      .button {
        display: block;
        width: 100%;
        text-align: center;
        background: linear-gradient(to right, #00C6FF, #6E00FF);
        color: white;
        padding: 12px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
      }
    </style>
  `;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-8">
          JEE - Maths Lectures
        </h1>
        <div
          className="flex flex-wrap justify-center md:justify-start -m-2"
          dangerouslySetInnerHTML={{ __html: lectureCardsHTML }}
        />
      </main>
    </>
  );
}
