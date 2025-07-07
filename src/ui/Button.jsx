import { Link } from 'react-router-dom';

function Button({children , to , type , onClick , onDelete}) {
    const className="bg-yellow-400 ippercase text-stone-800 font-semibold px-4 py-3 tracking-wider rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
    
    if(onClick) return  <button className={className} onClick={onClick}>
    {children}
</button>
    if(type === 'cart') return( <button onClick={onClick}  className={className + '  bg-stone-300 focus:ring-stone-400  hover:bg-stone-400 hover:text-stone-900'}>
    {children}
</button>)
    if(type==='delete')return( <button className={className + ' px-3 py-1 font-[300]'} onClick={onDelete}>
    {children}
</button>)
    if(to) return <Link to={to} className={className}>
    {children}</Link>
    return (
        <button className={className}>
            {children}
        </button>
    )
}

export default Button
