using Hotel.API.DTOs.Constant;

namespace Hotel.API.DTOs.ResponseDTOs
{
    public class CommonResponseDTO
    {
        public int Code { get; set; }
        public Object Data { get; set; } = null!;
        public string Message { get; set; }
        public string Error { get; set; } = null!;

        public CommonResponseDTO(int Code, string Message)
        {
            this.Code = Code;
            this.Message = Message;
        }

        public CommonResponseDTO(int Code,Object data, string Message)
        {
            this.Code =Code;
            this.Data = data;
            this.Message = Message;
        }
        public CommonResponseDTO(int Code, Object data, string Message, string Error)
        {
            this.Code = Code;
            this.Data = data;
            this.Message = Message;
            this.Error = Error;
        }
    }
}
