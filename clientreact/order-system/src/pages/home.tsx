import {Link} from 'react-router-dom'
export default function Home(){

    return(
        
        <div>
            <div className='login1'><Link to={'/shop/login'}>Login Shop</Link></div>
            <div className='login2'><Link to={'/client/login'}>Login Client</Link></div>
            <div className='register1'><Link to={'/shop/register'}>Register Shop</Link></div>
            <div className='register2'><Link to={'/client/register'}>Register Client</Link></div>
        </div>
    )
}