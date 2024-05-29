<script setup>
import { ref} from 'vue'
import axios from 'axios'

const userName=ref("Grace")

function submit() {
    console.log("aaa");
    axios.get('/api/sb/'+userName.value) 
      .then(res=>{
        console.log(res);
      })
      .catch(function (error) { 
        console.log(error);
    });
} 
</script>