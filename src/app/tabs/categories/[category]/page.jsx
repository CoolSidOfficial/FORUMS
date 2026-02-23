export default async function CategoryPage({ params }) {
  const { category } = params;

  const res = await fetch(
    `http://localhost:5000/api/posts/category/${category}`,
    { cache: "no-store" }
  );

  const posts = await res.json();

  return (
    <div>
      <h1>{category} Posts</h1>

      {posts.map(post => (
        <div key={post._id}>
          <a href={`/post/${post._id}`}>
            <h2>{post.title}</h2>
          </a>
        </div>
      ))}
    </div>
  );
}
