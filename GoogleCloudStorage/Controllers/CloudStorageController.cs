using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using GoogleCloudStorage.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GoogleCloudStorage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CloudStorageController : ControllerBase
    {
        private readonly GoogleCredential _googleCredentials;
        private readonly string _basePath;
        public CloudStorageController(Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment)
        {
            _basePath = hostingEnvironment.ContentRootPath;
        }

        // POST api/<CloudStorageController>
        [HttpPost]
        public async Task<string> Post([FromBody] FileRequestDto request)
        {
            string uploadedUrl = string.Empty;
            var sourcePath = Path.Combine(_basePath, $"Credentials/CredentialSource.json");
            var sourceItems = LoadJson(sourcePath);
            if(sourceItems != null && sourceItems.SourceList.Count > 0)
            {
                var source = sourceItems.SourceList.FirstOrDefault(x => x.Key == request.Key);
                if(source != null)
                {
                    var googleCredentials = GoogleCredential.FromFile(Path.Combine($"{_basePath}/Credentials", source.GCPStorageAuthfile));
                    var contentType = request.BinaryFile.Split(';')[0].Split(':')[1];
                    var fileSource = request.BinaryFile.Replace($"data:{contentType};base64,", string.Empty);
                    var bytes = Convert.FromBase64String(fileSource);
                    using (var memoryStream = new MemoryStream(bytes))
                    {
                        using (var storageClient = StorageClient.Create(googleCredentials))
                        {
                            var uploadedFile = await storageClient.UploadObjectAsync(source.GoogleCloudStorgaeBucketName, request.FileName, contentType, memoryStream);
                            uploadedUrl = uploadedFile.MediaLink;
                        }
                    }
                }
            }
            return await Task.FromResult(uploadedUrl);
        }

        private CredentialSourceListDto LoadJson(string sourcePath)
        {
            CredentialSourceListDto response = null;
            using (StreamReader r = new StreamReader(sourcePath))
            {
                string json = r.ReadToEnd();
                response = JsonConvert.DeserializeObject<CredentialSourceListDto>(json);
            }
            return response;
        }
    }
}
