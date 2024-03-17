export function useAgeStatus(age: number | undefined){
    switch(age){
        case undefined: return;
        case null: return "Такого имени нет 😥";
        default: return `Возраст: ${age}`
    }
}