import React,{useId} from 'react'

function Select({
    label,
    className="",
    options=[],
    ...otherProps
   },ref) {
    const id = useId();
  return (
    <div>
        {label && (<label htmlFor={id}>{label}</label>)}
      <select ref={ref} id = {id} className={`${className} px-3 py-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full`} {...otherProps}>
        {
           (options.length > 0) ? (
            options.map((option)=>(
            <option key = {option} value = {option}>{option}</option>
           )) 
        ): null    
        }
      </select>
    </div>
  )
}

export default React.forwardRef(Select);
