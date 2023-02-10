export const Note = ({categories = [], content, date}) => {

//export const Note = (props) => {
    // console.log({props}) //Mejor forma para hacer debug de las props
    // const {content, date} = props // para desesctructurar los props


    return (
      <li>
        <p>{content}</p>
        <small><time>{date}</time></small>

        {categories.map( (category) => (
                <small key={category}>{category} </small>
            )
        )}
      </li>
    )
  }

//export default Note