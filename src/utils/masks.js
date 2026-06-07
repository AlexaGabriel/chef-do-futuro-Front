// Máscara CPF
export function maskCPF(value) {
  const nums = value.replace(/\D/g, "").slice(0, 11);
  const a = nums.slice(0, 3);
  const b = nums.slice(3, 6);
  const c = nums.slice(6, 9);
  const d = nums.slice(9, 11);
  if (nums.length <= 3) return a;
  if (nums.length <= 6) return `${a}.${b}`;
  if (nums.length <= 9) return `${a}.${b}.${c}`;
  return `${a}.${b}.${c}-${d}`;
}

// Máscara Telefone
export function maskTelefone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
    .slice(0, 15);
}

// Máscara Data
export function maskData(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 10);
}

// Validação CPF
export function validarCPF(cpf) {
  const nums = cpf.replace(/\D/g, "");
  if (nums.length !== 11) return false;
  if (/^(\d)\1+$/.test(nums)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(nums[i]) * (10 - i);
  let dig1 = (soma * 10) % 11;
  if (dig1 === 10 || dig1 === 11) dig1 = 0;
  if (dig1 !== parseInt(nums[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(nums[i]) * (11 - i);
  let dig2 = (soma * 10) % 11;
  if (dig2 === 10 || dig2 === 11) dig2 = 0;
  return dig2 === parseInt(nums[10]);
}

// Validação Telefone
export function validarTelefone(tel) {
  const nums = tel.replace(/\D/g, "");
  return nums.length >= 11;
}