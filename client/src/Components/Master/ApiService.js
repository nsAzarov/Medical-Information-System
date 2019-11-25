export class APIService {
    async getResource(url) {
        const res = await fetch(`${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    }
    async getAllClinics() {
        const Clinics = await this.getResource(`/Clinics`);
        return Clinics;
    }
    async getAllDoctors() {
        const Doctors = await this.getResource(`/Doctors`);
        return Doctors;
    }
    async getTimeDiscountBooks() {
        const Books = await this.getResource(`/TimeDiscount`);
        return Books;
    }
    async getBestsellers() {
        const Books = await this.getResource(`/Bestsellers`);
        return Books;
    }
    async getTopRated() {
        const Books = await this.getResource(`/TopRated`);
        return Books;
    }
    async getOneProduct(id) {
        const product = await this.getResource(`/Product/${id}`);
        return product;
    }
    async getAllReviews() {
        const reviews = await this.getResource(`/Reviews`);
        return reviews;
    }
    async getAllBanners() {
        const banners = await this.getResource(`/Banners`);
        return banners;
    }
}