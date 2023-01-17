using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Hotel.API.Utils.Interfaces;

namespace Hotel.API.Utils
{
    public class CloudinaryUtil : UploadImage
    {
        private Cloudinary Cloudinary { get; set; }
        public string CloudName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }
        public CloudinaryUtil(IConfiguration Configuration)
        {
            CloudName = Configuration["Cloudinary:CloudName"];
            ApiKey = Configuration["Cloudinary:ApiKey"];
            ApiSecret = Configuration["Cloudinary:ApiSecret"];
        }
        private void init()
        {
            Cloudinary = new Cloudinary(new Account(CloudName, ApiKey, ApiSecret));
            Cloudinary.Api.Secure = true;
        }

        public string UploadToCloudinary(IFormFile file)
        {
            init();
            try
            {
                byte[] bytes;
                using (var memoryStream = new MemoryStream())
                {
                    file.CopyTo(memoryStream);
                    bytes = memoryStream.ToArray();
                }
                string base64 = Convert.ToBase64String(bytes);
                var prefix = @"data:image/png;base64,";
                var imagePath = prefix + base64;

                // create a new ImageUploadParams object and assign the directory name
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(imagePath),
                    Folder = "HotelManagement"
                };
                var uploadResult = Cloudinary.Upload(@uploadParams);
                return uploadResult.SecureUrl.AbsoluteUri;
            }
            catch (Exception)
            {
                return "up load failed";
            }
        }
    }
}
