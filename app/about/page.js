export default function About() {
  return (
    <div className="flex items-center flex-col">
      <h3>How to Use!</h3>
      <div className="text-left p-6 bg-card w-full max-w-[51rem] rounded-md my-5">
        <p>
          ⚫ - Start / ready <br />
          🔴 - Get ready. <br />
          🟢 - Click! <br />
          🔵 - You should see your results underneath. <br />
        </p>
      </div>
      <p className="bg-card p-6 rounded-md">
        Look on my{' '}
        <a className="text-orange-400" href="https://jessedoka.co/blog">
          blog
        </a>{' '}
        for updates
      </p>
    </div>
  )
}
