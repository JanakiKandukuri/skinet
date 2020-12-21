namespace Core.Entities
{
    public class Product: BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public ProductType ProductType { get; set; } //relation between entities established.
        public int ProductTypeId { get; set; }
        public ProductBrand ProductBrand { get; set; } //relation between entities established.
        public int ProductBrandId { get; set; }

    }
}