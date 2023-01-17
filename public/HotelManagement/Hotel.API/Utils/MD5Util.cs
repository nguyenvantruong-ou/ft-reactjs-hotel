using System.Security.Cryptography;
using System.Text;

namespace Hotel.API.Utils
{
    public class MD5Util
    {
        public static string GetMD5(string S)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] hashValue = md5.ComputeHash(Encoding.UTF8.GetBytes(S));
                return Convert.ToHexString(hashValue);
            }
        }
    }
}
