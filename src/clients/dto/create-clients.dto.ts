export class CreateClientsDto {
//nombre, apellido, fecha de nacimiento, dirección, teléfono, email, fecha de registro, tipo de plan, tipo de pago, y una foto.
    clientFirstName: string
    clientLastName: string
    borndate: number
    direction: string
    cellphone: number
    email: string
    planType: string
    payplan: string
    foto: string
}
