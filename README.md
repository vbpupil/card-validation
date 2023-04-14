# Card Validation

## How to use

### Installation

```
npm install @vbpupil/card-validation

or 

yarn add @vbpupil/card-validation
```

### Use
```
import CardForm from '@vbpupil/card-validation';

new CardForm();
```

### Use with options

```
new CardForm({
    show_card_number_icon: true,
    show_expiry_icon: true,
    show_cvv_icon: true,
    show_name_icon: true,
    excluded_card_providers: ['VISA', 'MASTERCARD'],
});
```
Options:

| Option                  | Description                           | Type    | Default |
|-------------------------|---------------------------------------|---------|---------|
| show_card_number_icon   | Show icon for card number input.      | Boolean | false   | 
| show_expiry_icon        | Show icon for expiry input.           | Boolean | false   |
| show_cvv_icon           | Show icon for CVV input.              | Boolean | false   | 
| show_name_icon          | Show icon for name input.             | Boolean | false   | 
| excluded_card_providers | Exclude specific cards ie: `['VISA']` | Array   | empty   | 


