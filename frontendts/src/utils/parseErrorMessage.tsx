// Thêm type định nghĩa cho error response
interface BackendErrorResponse {
	status: string;
	message: string;
	data?: Record<string, unknown>;
	source?: string;
}

interface RTKQueryError {
	status: number;
	data?: BackendErrorResponse;
}

// Interface cho error có message property
interface ErrorWithMessage {
	message: string;
}

// Type guard để kiểm tra error có message không
const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as Record<string, unknown>).message === 'string'
	);
};

// Helper function để parse error message
const parseErrorMessage = (err: unknown): string => {
	const defaultMsg = 'Có lỗi xảy ra khi tạo sản phẩm';
	
	if (!err) return defaultMsg;
	
	// RTK Query error shape
	if (typeof err === 'object') {
		const rtkError = err as RTKQueryError;
		
		// Ưu tiên lấy message từ backend response
		if (rtkError.data?.message) {
			return rtkError.data.message;
		}
		
		// Fallback sang error.message nếu có
		if (isErrorWithMessage(err)) {
			return err.message;
		}
	}
	
	return defaultMsg;
};

export default parseErrorMessage;