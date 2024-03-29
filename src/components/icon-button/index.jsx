import './index.sass'

const IconButton = ({ color = '', icon = undefined, name = '', onClick = () => {} }) => (
  <button className={`icon-button ${color}`} onClick={onClick}>
    {icon
      ? <img src={icon} alt={name} title={name} />
      : <></>}
  </button>
)

export default IconButton
