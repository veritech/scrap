import { validateAndCreateUser } from '../actions';

const Signup = () => {

    return (
            <form action={validateAndCreateUser}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input className="block border w-96 p-1" name="email" />
                </div>
                <button className="border p-2 rounded-md bg-slate-600 text-white">Signup</button>
            </form>
    )
}

export default Signup;