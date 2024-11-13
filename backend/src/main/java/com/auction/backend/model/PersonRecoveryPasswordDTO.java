package com.auction.backend.model;

public class PersonRecoveryPasswordDTO {
    private String email;
    private String validationCode;
    private String newPassword;

    public PersonRecoveryPasswordDTO(String email, String validationCode, String newPassword) {
        this.email = email;
        this.validationCode = validationCode;
        this.newPassword = newPassword;
    }

    public String getEmail() {
        return email;
    }

    public String getValidationCode() {
        return validationCode;
    }

    public String getNewPassword() {
        return newPassword;
    }
}
