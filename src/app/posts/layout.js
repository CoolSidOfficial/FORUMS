import Header from "../components/Header";

export default function PostsLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}