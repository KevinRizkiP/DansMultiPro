import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logins = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log(res.data);
        localStorage.setItem("name", JSON.stringify(res.data.name));
        navigate("/index");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="text-white text-center">
      <button onClick={login}>Continue with google</button>
    </div>
  );
};

export default Logins;
