export const Note = ({title, body}) => {

//export const Note = (props) => {
    // console.log({props}) //Mejor forma para hacer debug de las props
    // const {content, date} = props // para desesctructurar los props


    return (
      <li>
        <h4>{title}</h4>
        <small>{body}</small>
      </li>
    )
  }

//export default Note