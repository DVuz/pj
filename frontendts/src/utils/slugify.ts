function slugify(text: string): string {
	const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	return normalizedText
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-') // Thay thế ký tự không phải chữ cái hoặc số bằng dấu gạch ngang
		.replace(/^-+|-+$/g, ''); // Loại bỏ dấu gạch ngang ở đầu và cuối
}

export default slugify;