import axios from "axios";
import { useStateContext } from "../context/StateContext";
import { Navigate } from "react-router-dom";

const Login = () => {
    const {token, setToken} = useStateContext()

    if (token) {
        return <Navigate to={'/'} />
    }

    const handleLogin = async (e) => {
        e.preventDefault()
      try {
        const response = await axios.post('/auth/login', {
            email: e.target.email.value,
            password: e.target.password.value,
        })

        console.log(response.data)
        setToken(response.data.user.accessToken);
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <main>
        <section class="login">
           <div class="container">
              <div class="row justify-content-center">
                 <div class="col-lg-5 col-md-6">
                    <h1 class="text-center mb-4">Formify</h1>
                    <div class="card card-default">
                       <div class="card-body">
                          <h3 class="mb-3">Login</h3>

                          <form onSubmit={handleLogin} method="post">
                             <div class="form-group my-3">
                                <label for="email" class="mb-1 text-muted">Email Address</label>
                                <input type="email" id="email" name="email"  class="form-control" autoFocus />
                             </div>

                             <div class="form-group my-3">
                                <label for="password" class="mb-1 text-muted">Password</label>
                                <input type="password" id="password" name="password"  class="form-control" />
                             </div>

                             <div class="mt-4">
                                <button type="submit" class="btn btn-primary">Login</button>
                             </div>
                          </form>

                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
     </main>
     );
}

export default Login;
