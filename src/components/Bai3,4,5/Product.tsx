import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Quần đùi",
        price: 5000,
        description: "Mô tả quần đùi",
        imageUrl:
          "https://bizweb.dktcdn.net/100/415/697/products/img-7298-1.jpg?v=1723015511000",
      },
      {
        id: 2,
        name: "Áo hoa",
        price: 3000,
        description: "Mô tả áo hoa",
        imageUrl:
          "https://file.hstatic.net/1000054905/file/ao-hoa-di-bien-nam-sear-s1141__1__762b9b24330c40ed9c9ab145882ff84c.jpg",
      },
      {
        id: 3,
        name: "Mũ hoa",
        price: 7000,
        description: "Mô tả mũ hoa",
        imageUrl:
          "https://hanhduongshop.com/wp-content/uploads/2019/03/mu-rong-vanh-di-bien-hoa-dep-vanh-gon-song-mau-be.jpg",
      },
    ]);
  }, []);

  const handleUpload = async () => {
    if (!file) return "";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sondao1");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dq87endkv/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Upload error:", err);
      return "";
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imageUrl = await handleUpload();

    if (!imageUrl) {
      return;
    }

    const newItem = {
      ...newProduct,
      id: products.length + 1,
      imageUrl,
    };

    setProducts((prevProducts) => [...prevProducts, newItem]);

    setNewProduct({
      id: 0,
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
    });
    setFile(null);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((element) => element.id !== id));
  };

  return (
    <div className="container d-flex flex-column gap-3">
      <form
        className="d-flex flex-column gap-3 p-3 rounded"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="Nhập tên sản phẩm"
            value={newProduct.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Giá sản phẩm</label>
          <input
            className="form-control"
            type="number"
            name="price"
            id="price"
            placeholder="Nhập giá sản phẩm"
            value={newProduct.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Mô tả</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            placeholder="Nhập mô tả sản phẩm"
            value={newProduct.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="img">Ảnh sản phẩm</label>
          <br />
          <input
            type="file"
            id="img"
            name="img"
            hidden
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
          {file && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{
                  width: "150px",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              />
              <p className="text-secondary mt-1 mb-0">{file.name}</p>
            </div>
          )}
          <label htmlFor="img" className="upload-box">
            <span>+</span>
            <p>Upload</p>
          </label>
        </div>

        <button
          type="submit"
          style={{ width: "fit-content" }}
          className="btn btn-primary"
        >
          Thêm sản phẩm
        </button>
      </form>
      <div className="listProduct d-flex flex-wrap gap-4">
        {products.map((element) => {
          return (
            <div
              key={element.id}
              style={{
                width: "fit-content",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              <img
                src={element.imageUrl}
                alt={element.name}
                style={{ width: "200px" }}
              />
              <div className="infor p-3">
                <p>
                  {element.name} -{" "}
                  {element.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p className="text-secondary">{element.description}</p>
              </div>

              <button
                className="btn btn-outline-danger w-100"
                onClick={() => handleDelete(element.id)}
              >
                Xoá
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
