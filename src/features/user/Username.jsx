// import store from "../../store"
import {useSelector} from 'react-redux'
function Username() {
    
    const username =useSelector(state => state.user.username)
    return (
        <div className="hidden sm:block">
            {username}
        </div>
    )
}

export default Username
