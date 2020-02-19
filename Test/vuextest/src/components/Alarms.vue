<template>
<div>
        <p> Alarms</p>
        <p>{{Alarms}}</p>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState([
        'Alarms' 
    ])

}
</script>

<style>

</style>
