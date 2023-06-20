// Длинна строки

const getStringLength = (string, maxLength) => string.length <= maxLength;


getStringLength('test', 10);
getStringLength('test', 3);
getStringLength('test', 100);


// Palindrome

const isItPalindrome = (paragraph) => {
  if (!paragraph.length) {
    return false;
  }

  const sanitizedValue = paragraph.toLowerCase().replaceAll(/\s+/g, '');
  return sanitizedValue.split('').reverse().join('') === sanitizedValue;
};


isItPalindrome('Лёша на полке клопа нашёл');
isItPalindrome('Клара у карла украла Кораллы');
