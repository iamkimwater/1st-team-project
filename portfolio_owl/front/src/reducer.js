import Swal from 'sweetalert2'

export function loginReducer(userState, action) {
	
  switch (action.type) {
    case "LOGIN_SUCCESS":
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '좋은 하루입니다.',
				showConfirmButton: false,
				timer: 1500
			})
      console.log("%c로그인", "color: #d93d1a;");
      return {
        ...userState,
        user: action.payload,
      };
    case "LOGOUT":
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: '다시 만나뵙기를.',
				showConfirmButton: false,
				timer: 1500
			})
      console.log("%c로그아웃", "color: #d93d1a;");
      return {
        ...userState,
        user: null,
      };
    default:
      return userState;
			
  }
	
}
