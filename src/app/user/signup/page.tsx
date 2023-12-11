
import { validateAndCreateUser } from '../actions';

const Signup = () => {

    return (
            <form action={validateAndCreateUser}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input className="form-control" name="email" />
                </div>
                <button className="btn btn-primary">Signup</button>
            </form>
    )
}

export default Signup;