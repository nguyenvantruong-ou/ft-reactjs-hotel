using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Hotel.API.Areas.Management.DTOs.RequestDTO
{
    public class ServiceRequestDTO
    {
        [ValidateNever]
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        [ValidateNever]
        public IFormFile Image { get; set; }
    }
}
