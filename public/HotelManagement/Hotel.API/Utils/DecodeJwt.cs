using System.IdentityModel.Tokens.Jwt;

namespace Hotel.API.Utils
{
    public class DecodeJwt
    {
        public static JwtSecurityToken Decode(HttpRequest Request)
        {
            var Handler = new JwtSecurityTokenHandler();
            string AuthHeader = Request.Headers["Authorization"];
            AuthHeader = AuthHeader.Replace("Bearer ", "");
            //var jsonToken = Handler.ReadToken(AuthHeader);

            return Handler.ReadToken(AuthHeader) as JwtSecurityToken;
        }
    }
}
