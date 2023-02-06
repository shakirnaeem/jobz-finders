namespace GoogleCloudStorage.Models
{
    public class CredentialSourceDto
    {
        public string Key { get; set; }
        public string GCPStorageAuthfile { get; set; }
        public string GoogleCloudStorgaeBucketName { get; set; }
    }
    
    public class CredentialSourceListDto
    {
        public List<CredentialSourceDto> SourceList { get; set; }
    }
}
