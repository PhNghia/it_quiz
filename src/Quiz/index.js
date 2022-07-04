import Container from './Container'

export default function Quiz({ value}) {
  return (
    <div className="padding-0-15">
      <Container valueProp = { value } />
    </div>
  )
}
