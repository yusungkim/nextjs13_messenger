export default function Head() {
  return (
    <>
      <title>{process.env.APP_NAME || 'Meta Mssenger'}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
