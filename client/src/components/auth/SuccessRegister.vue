<template>
    <v-container fluid fill-height>
        <v-layout justify-center>
            <v-flex>
                   <v-layout>
                        <div>
                            Для подтверждения регистрации на вашу почту {{email}} отправлено письмо с подтвержденем.
                        </div>

                   </v-layout>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>

    export default {
       props:["email"] 
    }

</script>
