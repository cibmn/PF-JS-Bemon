Swal.fire({
  showCloseButton: true,
  title: "Subscribite al Newsletter!",
  input: "email",
  inputLabel: "Toda nuestra info mensual y fabulosos descuentos!",
  inputPlaceholder: "Dejanos tu email",

  confirmButtonText: "Subscribirme",
  preConfirm: (email) => {
      if (email) {

        Swal.fire(`Entered email: ${email}`);
      }
  }
});