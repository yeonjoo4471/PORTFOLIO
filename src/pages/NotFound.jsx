import { Link } from 'react-router'

export default function NotFound() {
  return (
    <main>
      <p>404 / PAGE NOT FOUND</p>
      <h1>페이지를 찾을 수 없습니다.</h1>

      <Link to="/">
        BACK TO HOME →
      </Link>
    </main>
  )
}