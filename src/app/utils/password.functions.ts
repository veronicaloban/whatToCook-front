export function showPassword(input: HTMLInputElement, iconClassList: DOMTokenList) {
    input.setAttribute('type', 'text');
  
    iconClassList.remove('bi-eye-slash-fill');
    iconClassList.add('bi-eye-fill');
}
  
export function hidePassword(input: HTMLInputElement, iconClassList: DOMTokenList) {
    input.setAttribute('type', 'password');
  
    iconClassList.remove('bi-eye-fill');
    iconClassList.add('bi-eye-slash-fill');
}
  