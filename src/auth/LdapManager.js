const { authenticate } = require('ldap-authentication')

class LdapManager {
    static async ValidateLdap(username, password) {
        try {
            const options = {
                ldapOpts: {
                    url: 'ldap://IPPrueba',
                },
                userDn: `${username}@prueba.ar`,
                userPassword: password,
            }
            const user = await authenticate(options);
            return true;
        } catch (error) {
            return false; /*  */
        }
    }
}

module.exports = LdapManager;