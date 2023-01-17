namespace Hotel.API.Utils.Interfaces
{
    public interface UploadImage
    {
        string UploadToCloudinary(IFormFile file);
    }
}
