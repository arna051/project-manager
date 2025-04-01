import axios from "axios";

axios.defaults.proxy = false;

export const Proxy = {
    data: (url) => async (req, res) => {
        try {
            const { data } = await axios.get(url, { params: { perPage: 24 } });
            res.send(data);
        } catch (err) {
            console.log(err);

            res.status(500).send();
        }
    },
    image: url => async (req, res) => {
        try {
            const response = await axios.get(`${url}${req.params.name}`, {
                responseType: "stream",
            });

            res.setHeader("Content-Disposition", `attachment; filename="${req.params.name}"`);
            res.setHeader("Content-Type", response.headers["content-type"]);
            response.data.pipe(res);
        } catch (err) {
            console.log(err);

            res.status(500).send();
        }
    }
}