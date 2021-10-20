import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id} >{props.label}</label>
      <input {...props.input} /> {/* The spread operator here means that all key/value pairs of 'props.input' get added as props to <input>. For example, if 'props.input' is {id: 'm1', type: 'text', placeholder: 'Monkey'}, these attributes would be added to the <input> tag */}
    </div>
  )
};

export default Input;
